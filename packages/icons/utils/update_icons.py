import xml.etree.ElementTree as ET
import os

for file in os.listdir('./src'):
    xml = ET.parse(f"./src/{file}")
    root = xml.getroot()

    viewbox = root.attrib.get("viewBox", None)

    if not viewbox:
        viewbox = root.attrib.get('viewbox', None)

    if (viewbox != "0 0 40 40"):
        print(f"{file} does not have perfect viewbox: {viewbox}")
