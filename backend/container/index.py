import json
import pygeonlp.api

class NoAddressPropertiesException(Exception):
    """"""
def extract_address_from_parsed(parsed):
    res = []
    for p in parsed:
        if p['geometry'] is None:
            continue
        if p.get('properties', None) is None:
            continue
        if p['properties'].get('node_type', None) is None:
            continue
        if p['properties']['node_type'] != 'ADDRESS':
            continue
        if p['properties'].get('address_properties', None) is None:
            raise NoAddressPropertiesException()
            
        props = p['properties']
        address_props = props['address_properties']
        new_props = {
            'id': address_props['id'],
            'surface': props['surface'],
            'fullname': ''.join(address_props['fullname']),
            'lng': address_props['x'],
            'lat': address_props['y'],
            'note': address_props['note']
        }
        d = {
            'type': p.get('type'),
            'geometry': p.get('geometry'),
            'properties': new_props
        }
        res.append(d)
    return res

def handler(event, context): 
    pygeonlp.api.init(jageocoder=True, db_dir='/db')
    parsed = pygeonlp.api.geoparse(event['arguments']['text'])
    extracted = extract_address_from_parsed(parsed)

    return extracted
    