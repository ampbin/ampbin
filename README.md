# ampbin

Learn AMP using the [AMPb.in website](https://ampb.in).

## install

First use bower to install CSS dependencies.

```shell
$ bower install
```

Then you will need to use npm or yarn to install the rest of the dependencies.

```shell
$ yarn install
```

After that you can run `gulp:watch` to compile any changes.

## contributions

Always welcome!

## database structure

```json
{
    "bins": {
        "one": {
            "bin": "data",
            "timestamp": 71098232
        },
        "two": {
            "bin": "different data",
            "timestamp": 987387498273
        }
    },
    "user_bins": {
        "user_one": {
            "bins": {
              "one": true,
              "two": true
        },
        "user_two": {
            "bins": {
              "two": true
            }
        }
    }
}
```
