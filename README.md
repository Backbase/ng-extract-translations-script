# NOTE: THIS IS NOT AN ACCELERATOR IS JUST A SCRIPT TO TEST THE FEASIBILITY OF EXTRACTING ANGULAR TRANSLATION KEYS
# NOTE: YOU CAN MODIFY THIS SCRIPT BUT WE ARE NOT COMMITTED TO DO ANY FURTHER IMPROVEMENT OR FIX ON THIS SCRIPT

## extract-translations-script
This is a POC to test the feasibility of extracting the translation keys, default values and context from the source code of the journeys.

### How it works
In order to use this script you need to clone or to download the BB repository on which you want to seek for the translations keys and default values.

The script will check for translations in HTML and TypeScript files and will create a CSV file in the path provided if translations keys have been found.

User can provide what is the default value on which the translations are stored and optionally, the user can provide a list of other locales separated by commas so they are already part of the CSV file, but the rows for these other locales will be empty.

For this script to work you need to provide a set of arguments.
Only two of the arguments are mandatory, **directory** and **csv path**.

See the arguments section for more details.

### Usage
- Download or clone this repository.
- Install dependencies using `npm ci`

**Here you have some examples about how to use the script.**

*No default locale and no other locales*
Executing the following command it will use the default values for default locale, en-US, and for other locales, [].

`node index.js -d /Users/username/path/to/journey-repo/libs/journey-name -c /Users/username/path/to/my-csv-file.csv`

*Provide default locale but no other locales*
Executing the following command it will use the default value for other locales, [].

`node index.js -d /Users/username/path/to/journey-repo/libs/journey-name -c /Users/username/path/to/my-csv-file.csv -l es-ES`

*Provide default locale and other locales*

`node index.js -d /Users/username/path/to/journey-repo/libs/journey-name -c /Users/username/path/to/my-csv-file.csv -l es-ES -o fr-FR,nl-NL`

#### Arguments

##### -d, Directory to seek for translations --MANDATORY--

The absolute path to the folder on which you want the script to seek for translations.

Example: `-d /Users/username/path/to/journey-repo/libs/journey-name`

##### -c, CSV path to create the CSV file with the translations --MANDATORY--

This is the absolute path, including the filename on which the user wants to store the CSV file with all the translation keys with values and context, for the default locale and other locales.

Example: `-c /Users/username/path/to/my-csv-file.csv`

##### -l, Default locale

This is the locale ISO value. The default value is 'en-US'

*ATTENTION: On this POC there is no check to confirm that the value provided is a right ISO locale*

Example: `-l es-ES`

##### -o, Other locales

This is a list of other locale ISO values separated by commas. The default value is an empty array.

*ATTENTION: On this POC there is no check to confirm that the value provided is a right ISO locale*

Example: `-o fr-FR, nl-NL`

### Example of CSV file

```csv
key,es-ES,fr,nl,context
bb-session-timeout-widget.header,Session timeout header,,,Header of the session timeout modal
bb-session-timeout-widget.body,Session timeout body,,,Body text of the session timeout modal
```

You can see an example of an execution of the script on this repository with the name [test.csv](test.csv)

