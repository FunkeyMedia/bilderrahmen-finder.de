Die PDFs sind fertige öffentliche Downloads. Der Katalog dokumentiert Inhalte, Felder und fiktive Beispiele.

Manuelle Neuerzeugung: `python templates/build.py` mit installiertem reportlab. Kein Python ist im Produktions-Build erforderlich. Anschließend PDF-Felder und Speichern prüfen und alle Seiten rendern. Die Vorschau mit `pdftoppm -f 1 -singlefile -r 108 -png public/vorlagen/DATEI.pdf public/vorlagen/DATEI-vorschau` aktualisieren. Änderungen im Generator müssen auch in templates/catalog.json festgehalten werden.

PDF-Einträge bleiben auf dem Gerät des Nutzers. Downloadklicks und Interesse am nächsten Angebot sind getrennte Messereignisse. Google-Indexierung oder SEO-Erfolg werden nicht versprochen.
