import codecs

d = {}


def writeFiles(filename):
    with codecs.open(filename + ".txt", 'r', encoding='utf-8') as dict_file:
        for line in dict_file:
            d[line[0:103]] = line[106:-2]

    with codecs.open(filename + ".html", 'w', encoding='utf-8') as html_file:
        for k, v in d.items():
            html_file.write(u'<h3>{name}</h3><img src="{link}">\n'.format(name=v, link=k))

    with codecs.open(filename + ".js", 'w', encoding='utf-8') as js_file:
        js_file.write(u'dict = {\n')
        for k, v in d.items():
            js_file.write(u'"{link}" : "{name}",\n'.format(name=v, link=k))
        js_file.write(u'};\n')

writeFiles("50")
writeFiles("2001")
