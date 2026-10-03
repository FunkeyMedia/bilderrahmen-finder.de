from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4

def wrap(c, text, x, y, width, size=10, leading=15):
    c.setFont('Helvetica', size)
    line = ''
    for word in text.split():
        candidate = (line + ' ' + word).strip()
        if c.stringWidth(candidate, 'Helvetica', size) > width and line:
            c.drawString(x, y, line); y -= leading; line = word
        else: line = candidate
    if line: c.drawString(x, y, line)
    return y - leading

def build(site, variant, folder):
    suffix = {'druck':'', 'ausfuellbar':'-ausfuellbar', 'beispiel':'-beispiel'}[variant]
    path = folder / (site['slug'] + suffix + '.pdf')
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle(site['title'] + ' | ' + site['domain'])
    c.setAuthor(site['domain']); c.setSubject('Kostenlose Vorlage, privat und betrieblich nutzbar')
    w, h = A4; accent = HexColor(site['color'])
    for pi, page in enumerate(site['pages']):
        c.setFillColor(accent); c.rect(0, h-10, w, 10, fill=1, stroke=0)
        c.setFont('Helvetica-Bold', 11); c.drawString(38,h-44,site['domain'])
        c.setFillColor(HexColor('#24312e')); c.setFont('Helvetica-Bold',18)
        c.drawString(38,h-84,page['title'])
        labels = {'druck':'DRUCKVORLAGE', 'ausfuellbar':'AM BILDSCHIRM AUSFÜLLBAR', 'beispiel':'FIKTIVES BEISPIEL'}
        c.setFont('Helvetica-Bold',9); c.setFillColor(accent); c.drawString(38,h-109,labels[variant])
        c.setFillColor(HexColor('#45534f')); wrap(c,page['intro'],38,h-133,w-76)
        y = h-199
        for ri, row in enumerate(page['rows']):
            cell = (w-76-12*(len(row)-1))/len(row)
            for ci,(label,value) in enumerate(row):
                x=38+ci*(cell+12)
                c.setFillColor(HexColor('#24312e')); c.setFont('Helvetica',8 if len(row)==3 else 9)
                c.drawString(x,y+34,label)
                c.setFillColor(white); c.setStrokeColor(HexColor('#bccac5')); c.roundRect(x,y,cell,27,3,fill=1,stroke=1)
                if variant=='ausfuellbar':
                    c.acroForm.textfield(name=f'p{pi+1}_r{ri+1}_c{ci+1}',tooltip=label,x=x+1,y=y+1,width=cell-2,height=25,fontName='Helvetica',fontSize=10,borderWidth=0,fillColor=white,textColor=HexColor('#24312e'),maxlen=100)
                elif variant=='beispiel':
                    c.setFont('Helvetica',9 if len(row)==3 else 10); c.setFillColor(HexColor('#24312e')); c.drawString(x+6,y+9,value)
            y-=66
        y-=8
        c.setFont('Helvetica-Bold',10); c.setFillColor(HexColor('#24312e')); c.drawString(38,y+10,page['notes'])
        c.setStrokeColor(HexColor('#bccac5')); c.rect(38,y-80,w-76,78,stroke=1,fill=0)
        if variant=='ausfuellbar':
            c.acroForm.textfield(name=f'p{pi+1}_notes',tooltip=page['notes'],x=40,y=y-78,width=w-80,height=74,fontName='Helvetica',fontSize=10,borderWidth=0,fillColor=white,textColor=HexColor('#24312e'),fieldFlags='multiline',maxlen=450)
        elif variant=='beispiel': wrap(c,page['example'],45,y-19,w-90,10,15)
        c.setFillColor(HexColor('#45534f')); wrap(c,page['note'],38,110,w-76,9,13)
        c.setStrokeColor(HexColor('#bccac5')); c.line(38,43,w-38,43)
        c.setFont('Helvetica',8); c.drawString(38,29,'Kostenlos privat & betrieblich nutzbar. Kein Weiterverkauf. Stand: 03.10.2026.')
        c.drawRightString(w-38,29,f'{pi+1} / {len(site["pages"])}'); c.showPage()
    c.save()
    return path


root=Path(__file__).resolve().parent.parent
site=json.loads((root/"templates/catalog.json").read_text(encoding="utf-8"))
folder=root/"public/vorlagen"
folder.mkdir(parents=True,exist_ok=True)
for variant in ("druck","ausfuellbar","beispiel"): print(build(site,variant,folder))
