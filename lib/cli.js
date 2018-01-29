const fs = require('fs')
const path = require('path')
const meow = require('meow')
const swaggerMerge = require('swagger-merge')

const cli = meow(`
    Usage
      $ swagger-merge [files...]

    Options
      --host, -h  Hostname
      --path, -p  Base path
      --infoversion, -v  Version
      --title, -t  Title
      --description, -d  Description
      --schemes, -s  Schemes
      --out, -o  Outfile

    Examples
      $ swagger-merge -b example.com swagger1.json swagger2.json
      {
        "swagger": "2.0",
        "info": {
          "title": "Swagger",
          "version": "1.0.0"
        },
        ...
      }

      $ swagger-merge -v "1.0.0" -t "My Api" -d "My description" -s https,http -h example.com -p "/v1/" swagger1.json swagger2.json -o swagger.json
      Wrote to /absolute_path/swagger.json

      $ swagger-merge --version
      0.0.1
`, {
    flags: {
        host: {
            type: 'string',
            alias: 'h'
        },
        path: {
            type: 'string',
            alias: 'h'
        },
        infoversion: {
            type: 'string',
            alias: 'v'
        },
        title: {
            type: 'string',
            alias: 't'
        },
        description: {
            type: 'string',
            alias: 'd'
        },
        schemes: {
            type: 'string',
            alias: 's'
        },
        out: {
            type: 'string',
            alias: 'o'
        }
    }
});

let {
  h:hostname,
  p:pathname,
  v:version,
  t:title,
  d:description,
  s:schemes,
  o:outfile
} = cli.flags

if (hostname == undefined) {
  hostname = 'example.com'
}
if (pathname == undefined) {
  pathname = '/'
}
if (version == undefined) {
  version = '1.0.0'
}
if (title == undefined) {
  title = 'Swagger'
}
if (title == undefined) {
  description = ''
}
if (schemes == undefined) {
  schemes = ['https', 'http']
} else {
  schemes = schemes.split(',').map(x => x.trim())
}

const info = {
    version,
    title,
    description
}

const swaggerDocs = cli.input.map(filepath => {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'))
  } catch(error) {
    return null
  }
})
.filter(x => x)

swaggerMerge.on('warn', msg => {
    console.log(msg)
})

const merged = swaggerMerge.merge(swaggerDocs, info, pathname, hostname, schemes)

if (outfile == undefined) {
  console.log(JSON.stringify(merged, null, 2))
} else {
  fs.writeFileSync(outfile, JSON.stringify(merged, null, 2))
  console.log(`Wrote to ${path.resolve(outfile)}`)
}
