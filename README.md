# swagger-merge-cli

> Merge multiple [Swagger](https://swagger.io/) specification files into one.

## Install

```bash
npm install -g swagger-merge-cli
```

## Documentation

```bash
$ swagger-merge --help

  Merge multiple Swagger specification files into one.

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
```

## License

MIT
