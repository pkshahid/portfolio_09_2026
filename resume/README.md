# Résumé generator

Generates an ATS-friendly résumé (`Mohammed_Shahid_Resume.docx` + `Mohammed_Shahid_Resume.pdf`) from `resume.json`, which holds the authoritative content.

## Build

```bash
python3 -m venv .venv
.venv/bin/pip install python-docx==1.2.0 reportlab==5.0.1
.venv/bin/python resume/build_resume.py
```

Edit `resume.json`, then rebuild. To update the downloadable résumé on the site, copy `resume/Mohammed_Shahid_Resume.pdf` to `public/Mohammed_Shahid_resume.pdf`.
