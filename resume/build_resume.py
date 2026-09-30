import json
import os
from docx import Document
from docx.shared import Pt, Inches, Mm, RGBColor
from docx.enum.text import WD_TAB_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = json.load(open(os.path.join(HERE, 'resume.json')))

MARGIN_X = Inches(0.6)
MARGIN_TOP = Inches(0.5)
MARGIN_BOTTOM = Inches(0.5)
BODY = 10
HEADING = 11
LINE_SPACING = 1.15

def contact_lines(items, width):
    sep = '  |  '
    sepw = stringWidth(sep, 'Helvetica', 9.5)
    lines = []
    cur = []
    curw = 0.0
    for it in items:
        iw = stringWidth(it, 'Helvetica', 9.5)
        total = iw if not cur else curw + sepw + iw
        if not cur or total <= width:
            cur.append(it)
            curw = total
        else:
            lines.append(sep.join(cur))
            cur = [it]
            curw = iw
    if cur:
        lines.append(sep.join(cur))
    return lines


SECTIONS = [
    'PROFESSIONAL SUMMARY',
    'SKILLS',
    'PROFESSIONAL EXPERIENCE',
    'EDUCATION',
    'CERTIFICATIONS',
    'LANGUAGES',
]


def set_run(run, size, bold=False):
    run.font.name = 'Arial'
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = RGBColor(0, 0, 0)
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.find(qn('w:rFonts'))
    if rfonts is None:
        rfonts = OxmlElement('w:rFonts')
        rpr.append(rfonts)
    for attr in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rfonts.set(qn(attr), 'Arial')


def para(doc, space_after=3, space_before=0):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_after = Pt(space_after)
    pf.space_before = Pt(space_before)
    pf.line_spacing = LINE_SPACING
    return p


def bottom_rule(p):
    ppr = p._p.get_or_add_pPr()
    pbdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '4')
    bottom.set(qn('w:space'), '2')
    bottom.set(qn('w:color'), '444444')
    pbdr.append(bottom)
    ppr.append(pbdr)


def build_docx(path):
    doc = Document()
    sec = doc.sections[0]
    sec.page_width = Mm(210)
    sec.page_height = Mm(297)
    sec.left_margin = MARGIN_X
    sec.right_margin = MARGIN_X
    sec.top_margin = MARGIN_TOP
    sec.bottom_margin = MARGIN_BOTTOM

    normal = doc.styles['Normal']
    normal.font.name = 'Arial'
    normal.font.size = Pt(BODY)
    normal.font.color.rgb = RGBColor(0, 0, 0)
    normal.paragraph_format.line_spacing = LINE_SPACING
    normal.paragraph_format.space_after = Pt(3)
    rpr = normal.element.get_or_add_rPr()
    rfonts = rpr.find(qn('w:rFonts'))
    if rfonts is None:
        rfonts = OxmlElement('w:rFonts')
        rpr.append(rfonts)
    for attr in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rfonts.set(qn(attr), 'Arial')
    lb = doc.styles['List Bullet']
    lb.font.name = 'Arial'
    lb.font.size = Pt(BODY)
    lb.font.color.rgb = RGBColor(0, 0, 0)
    lb.paragraph_format.line_spacing = LINE_SPACING
    lb.paragraph_format.space_after = Pt(2)

    usable = sec.page_width - sec.left_margin - sec.right_margin

    p = para(doc, space_after=2)
    set_run(p.add_run(DATA['name']), 18, bold=True)
    p = para(doc, space_after=2)
    set_run(p.add_run(DATA['headline']), HEADING)
    p = para(doc, space_after=6)
    groups = contact_lines(DATA['contact'], int(usable) / 914400 * 72)
    for gi, g in enumerate(groups):
        r = p.add_run(g)
        set_run(r, 9.5)
        if gi < len(groups) - 1:
            r.add_break()

    def heading(text):
        h = para(doc, space_after=4, space_before=8)
        h.paragraph_format.keep_with_next = True
        set_run(h.add_run(text), HEADING, bold=True)
        bottom_rule(h)

    def role_line(title, dates, right_tab=True):
        p = para(doc, space_after=1)
        p.paragraph_format.keep_with_next = True
        p.paragraph_format.keep_together = True
        if right_tab:
            p.paragraph_format.tab_stops.add_tab_stop(usable, WD_TAB_ALIGNMENT.RIGHT)
        set_run(p.add_run(title), BODY, bold=True)
        set_run(p.add_run('\t' + dates), BODY)

    heading('PROFESSIONAL SUMMARY')
    p = para(doc)
    set_run(p.add_run(DATA['summary']), BODY)

    heading('SKILLS')
    for label, values in DATA['skills']:
        p = para(doc, space_after=2)
        set_run(p.add_run(label + ': '), BODY, bold=True)
        set_run(p.add_run(values), BODY)

    heading('PROFESSIONAL EXPERIENCE')
    for i, job in enumerate(DATA['experience']):
        p = para(doc, space_after=1, space_before=0 if i == 0 else 4)
        p.paragraph_format.keep_with_next = True
        set_run(p.add_run(job['company']), BODY, bold=True)
        set_run(p.add_run(' — ' + job['location']), BODY)
        for title, dates in job['roles']:
            role_line(title, dates)
        for b in job['bullets']:
            bp = doc.add_paragraph(style='List Bullet')
            bp.paragraph_format.space_after = Pt(2)
            bp.paragraph_format.line_spacing = LINE_SPACING
            bp.paragraph_format.keep_together = True
            bp.paragraph_format.left_indent = Inches(0.25)
            bp.paragraph_format.first_line_indent = Inches(-0.18)
            set_run(bp.add_run(b), BODY)

    heading('EDUCATION')
    for ed in DATA['education']:
        p = para(doc, space_after=1)
        p.paragraph_format.keep_with_next = True
        p.paragraph_format.tab_stops.add_tab_stop(usable, WD_TAB_ALIGNMENT.RIGHT)
        set_run(p.add_run(ed['degree']), BODY, bold=True)
        set_run(p.add_run('\t' + ed['dates']), BODY)
        p = para(doc, space_after=1)
        p.paragraph_format.keep_with_next = True
        set_run(p.add_run(ed['school']), BODY)
        p = para(doc)
        set_run(p.add_run(ed['detail']), BODY)

    heading('CERTIFICATIONS')
    for c in DATA['certifications']:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.space_after = Pt(2)
        bp.paragraph_format.keep_together = True
        bp.paragraph_format.left_indent = Inches(0.25)
        bp.paragraph_format.first_line_indent = Inches(-0.18)
        set_run(bp.add_run(c), BODY)

    heading('LANGUAGES')
    p = para(doc)
    set_run(p.add_run(DATA['languages']), BODY)

    doc.save(path)


PAGE_W, PAGE_H = A4
MX = 0.6 * 72
MY_TOP = 0.5 * 72
MY_BOT = 0.5 * 72
RIGHT = PAGE_W - MX
BODY_LEAD = BODY * LINE_SPACING

LINKS = {
    'hello@mohammedshahid.in': 'mailto:hello@mohammedshahid.in',
    'linkedin.com/in/mohammed-shahid-8456b218b': 'https://linkedin.com/in/mohammed-shahid-8456b218b',
    'github.com/pkshahid': 'https://github.com/pkshahid',
    'mohammedshahid.in': 'https://mohammedshahid.in',
}


class Pdf:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle('Mohammed Shahid – Resume')
        self.c.setAuthor('Mohammed Shahid')
        self.y = PAGE_H - MY_TOP

    def need(self, h):
        if self.y - h < MY_BOT:
            self.c.showPage()
            self.y = PAGE_H - MY_TOP

    def font(self, size, bold):
        return 'Helvetica-Bold' if bold else 'Helvetica'

    def wrap(self, text, size, bold, width):
        words = text.split(' ')
        lines, cur = [], ''
        for w in words:
            trial = w if not cur else cur + ' ' + w
            if stringWidth(trial, self.font(size, bold), size) <= width:
                cur = trial
            else:
                if cur:
                    lines.append(cur)
                cur = w
        if cur:
            lines.append(cur)
        return lines

    def line(self, text, x, size, bold, right=None, lead=None):
        lead = lead or size * LINE_SPACING
        self.need(lead)
        self.y -= lead
        self.c.setFont(self.font(size, bold), size)
        self.c.setFillColorRGB(0, 0, 0)
        self.c.drawString(x, self.y, text)
        if right is not None:
            self.c.setFont('Helvetica', size)
            self.c.drawRightString(RIGHT, self.y, right)
        return self.y

    def text(self, text, size=BODY, bold=False, x=None, width=None, space_after=3):
        x = MX if x is None else x
        width = (RIGHT - x) if width is None else width
        for ln in self.wrap(text, size, bold, width):
            self.line(ln, x, size, bold)
        self.y -= space_after

    def bullet(self, text, size=BODY):
        indent = 12
        lines = self.wrap(text, size, False, RIGHT - MX - indent)
        for i, ln in enumerate(lines):
            self.need(BODY_LEAD)
            self.y -= BODY_LEAD
            self.c.setFont(self.font(size, False), size)
            if i == 0:
                self.c.drawString(MX, self.y, '•')
            self.c.drawString(MX + indent, self.y, ln)
        self.y -= 2

    def heading(self, text, next_h=0):
        h_total = 5 + HEADING * LINE_SPACING + 8 + next_h
        if self.y - h_total < MY_BOT:
            self.c.showPage()
            self.y = PAGE_H - MY_TOP
        self.y -= 5
        self.need(HEADING * LINE_SPACING)
        self.y -= HEADING * LINE_SPACING
        self.c.setFont('Helvetica-Bold', HEADING)
        self.c.drawString(MX, self.y, text)
        self.y -= 4
        self.c.setStrokeColorRGB(0x44 / 255, 0x44 / 255, 0x44 / 255)
        self.c.setLineWidth(0.6)
        self.c.line(MX, self.y, RIGHT, self.y)
        self.y -= 4

    def role(self, title, dates):
        self.line(title, MX, BODY, True, right=dates, lead=BODY_LEAD)
        self.y -= 1

    def contact_links(self, text, x, size, baseline):
        pos = 0
        for item, url in LINKS.items():
            i = text.find(item, pos)
            if i < 0:
                continue
            prefix_w = stringWidth(text[:i], 'Helvetica', size)
            item_w = stringWidth(item, 'Helvetica', size)
            self.c.linkURL(url, (x + prefix_w, baseline - 2, x + prefix_w + item_w, baseline + size), relative=0)
            pos = i + len(item)


def build_pdf(path):
    pdf = Pdf(path)
    c = pdf.c
    c.setFont('Helvetica-Bold', 18)
    pdf.y -= 18
    c.drawString(MX, pdf.y, DATA['name'])
    pdf.y -= 4
    pdf.line(DATA['headline'], MX, HEADING, False)
    for cl in contact_lines(DATA['contact'], RIGHT - MX):
        baseline = pdf.line(cl, MX, 9.5, False)
        pdf.contact_links(cl, MX, 9.5, baseline)
    pdf.y -= 6

    pdf.heading('PROFESSIONAL SUMMARY', len(pdf.wrap(DATA['summary'], BODY, False, RIGHT - MX)) * BODY_LEAD + 3)
    pdf.text(DATA['summary'])

    first_skill = pdf.wrap(DATA['skills'][0][0] + ': ' + DATA['skills'][0][1], BODY, False, RIGHT - MX)
    pdf.heading('SKILLS', len(first_skill) * BODY_LEAD + 2)
    for label, values in DATA['skills']:
        lab = label + ': '
        lines = pdf.wrap(lab + values, BODY, False, RIGHT - MX)
        first = True
        for ln in lines:
            pdf.need(BODY_LEAD)
            pdf.y -= BODY_LEAD
            x = MX if first else MX
            if first:
                lw = stringWidth(lab, 'Helvetica-Bold', BODY)
                c.setFont('Helvetica-Bold', BODY)
                c.drawString(MX, pdf.y, lab)
                c.setFont('Helvetica', BODY)
                c.drawString(MX + lw, pdf.y, ln[len(lab):])
            else:
                c.setFont('Helvetica', BODY)
                c.drawString(MX, pdf.y, ln)
            first = False
        pdf.y -= 2

    pdf.heading('PROFESSIONAL EXPERIENCE', 2 * BODY_LEAD + 2)
    for i, job in enumerate(DATA['experience']):
        if i > 0:
            pdf.y -= 4
        pdf.need(BODY_LEAD)
        pdf.y -= BODY_LEAD
        c.setFont('Helvetica-Bold', BODY)
        cw = stringWidth(job['company'], 'Helvetica-Bold', BODY)
        c.drawString(MX, pdf.y, job['company'])
        c.setFont('Helvetica', BODY)
        c.drawString(MX + cw, pdf.y, ' — ' + job['location'])
        pdf.y -= 1
        for title, dates in job['roles']:
            pdf.role(title, dates)
        for b in job['bullets']:
            pdf.bullet(b)

    pdf.heading('EDUCATION', 3 * BODY_LEAD + 3)
    for ed in DATA['education']:
        pdf.role(ed['degree'], ed['dates'])
        pdf.text(ed['school'], space_after=1)
        pdf.text(ed['detail'])

    pdf.heading('CERTIFICATIONS', len(pdf.wrap(DATA['certifications'][0], BODY, False, RIGHT - MX - 12)) * BODY_LEAD + 2)
    for cert in DATA['certifications']:
        pdf.bullet(cert)

    pdf.heading('LANGUAGES', len(pdf.wrap(DATA['languages'], BODY, False, RIGHT - MX)) * BODY_LEAD + 3)
    pdf.text(DATA['languages'])

    c.save()


if __name__ == '__main__':
    build_docx(os.path.join(HERE, 'Mohammed_Shahid_Resume.docx'))
    build_pdf(os.path.join(HERE, 'Mohammed_Shahid_Resume.pdf'))
    print('done')
