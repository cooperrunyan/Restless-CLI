# Restless

A CLI-based http client

## Installation

If you don't want to globally install the package, omit the `-g` flag

### Mac/Linux

```bash
sudo npm install -g restlss
```

### Windows

```bash
npm i -g restlss
```

## Info

Usage: `restless <command>`

Aliases: `restlss`, `rest`

Version: `0.1.1`

## Notes

- The commands `rest`, `restless` and `restlss` are all interchangeable.
- Data persists when updgrading the CLI, because it is stored in a `/tmp/` file
- Used with commander.js
- Command output is meant to resemble Cliffy (Deno successor of commander.js)
  command output.
- Cliffy is better than commander.js, but Restless uses commander because Node
  provides a simpler user experience than Deno
- I highly recommend Cliffy
- All **_user data_** is stored in `/tmp/restless/data.json`

## Commands

### Collection

Usage: `restless collection <subcommand> [options]`

Aliases `c`

Description: The `collection` command can be used to manage collections.

Note: Collections are places to store template requests; each collection would
typically be for each project that you make. Say you have a project that is
called "Hello World" that has an API that requires testing. Create a collection
with a meaningful name in relation to the project, like: `hello-world`. This
collection would be where you store all of your requests.

#### Add

- Usage: `restless collection add <name>`
- Aliases: `a`,
- Description: Add a collection
- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the collection to be added

#### Rename

- Usage: `restless collection rename <old-name> <new-name>`
- Aliases: none,
- Description: Change the name of a collection
- Arguments:
  - `old-name`
    - Type: `string`
    - Description: Name of the collection to be renamed
  - `new-name`
    - Type: `string`
    - Description: The new name of the collection

#### Remove

- Usage: `restless collection remove <name>`
- Aliases: `rm`,
- Description: Remove/delete a collection
- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the collection to be removed

#### List

- Usage: `restless collection list`
- Aliases: `l`,
- Description: List all collections

#### Use

- Usage: `restless collection use <name>`
- Aliases: `u`,
- Description: Select a collection to be used
- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the collection to be selected

#### Current

- Usage: `restless collection current`
- Aliases: `c`,
- Description: Output the currently selected collection

---

### Request

Usage: `restless request <subcommand> [options]`

Aliases `r`

Description: The `request` command can be used to create, view, update, and
delete requests in the current selected collection.

Note: Requests get sent with the `send` command.

#### Set

- Usage: `restless request set <request-name>`
- Aliases: `s`,
- Description: Create a request, or update an existing one

- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the request to be modified/created

- Options:
  - `--host`
    - Type: `string`
    - Required: `false`
    - Description: The host for the request

  - `--url`
    - Type: `string`
    - Required: `false`
    - Description: The url for the request

  - `-e`, `--endpoint`
    - Type: `string`
    - Required: `false`
    - Description: Set the endpoint for the request to be sent to

  - `-b`, `--body`
    - Note: This option is interesting; You can pass in a URL to a `.txt`,
      `.yml`/`.yaml`, or `.json` file. If the file is YAML, it'll be parsed to
      JSON. A txt file will be sent as plaintext. As well you can pass YAML
      (which will be parsed to JSON) or JSON data.
    - Type: `string`
    - Required: `false`
    - Description: Set the endpoint for the request to be sent to
    - Examples
      - `-b ./req.yml`
      - `-b ./req.json`
      - `-b ./req.txt`
      - `-b 'ping: pong'` - If valid YAML, will be parsed to JSON
      - `-b '{"ping": "pong"}'`
      - `-b 'ping'`

  - `-h`, `--header`
    - Type: `string`
    - Required: `false`
    - Description: Set a header
    - Usage: `key:value` - Key/Value pairs are separated by a colon (`:`)
    - Example
      - `-h 'X-auth-key:my-secret-key'`

  - `-m`, `--method`
    - Type: `GET` | `POST` | `PUT` | `PATCH` | `DELETE` | `OPTIONS` | `HEAD` |
    - Required: `false`
    - Description: Set the request method
    - Examples
      - `-m get`
      - `-m GET`
      - `-m GeT` - Uses `String.prototype.toUpperCase()`, casing doesn't matter

#### Remove

- Usage: `restless request remove <request-name>`
- Aliases: `rm`,
- Description: Remove a request in the current collection

- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the request to be removed

#### Check

- Usage: `restless request check <request-name>`
- Aliases: `c`,
- Description: Check if a request has sufficient data to be sent.

- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the request to be checked

#### Info

- Usage: `restless request info <request-name>`
- Aliases: `i`,
- Description: Read the info of a request

- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the request to be checked

- Options:
  - `-b`, `--body`: Show the body of the request to be sent
  - `-c`, `--collapse`: Only neccessary if `--body` is true, minifies JSON
    output

#### List

- Usage: `restless request list`
- Aliases: `l`,
- Description: List all requests in the current collection

### Send

- Usage: `restless send <request-name>`
- Alternate Usage: `restless request send <request-name>`
- Aliases: `s`,
- Description: Sends a request

- Arguments:
  - `name`
    - Type: `string`
    - Description: Name of the request to be sent

### Host

The host command is a way to set url variables, in a sense. For example, if you
have a project _hosted_ on http://localhost:3000, and don't want to write the
full url every time you make a request, you can set a host to reference
http://localhost:3000, then reference the host, instead of the full url

- Usage: `restless host <sub-command>`
- Aliases: `h`,
- Description: Manage all hosts

#### Set

- Usage: `restless host set <host-name> <url>`
- Aliases: `s`,
- Description: Create a reference to a url origin
- Example:
  - `restless host set dev http://localhost:3000` - This can be referenced later
    with: `restless request set ping --host dev` to point to the
    http://localhost:3000 URL without needing to write the URL for every request

- Arguments:
  - `host-name`
    - Type: `string`
    - Description: Reference name of the host
  - `url`
    - Type: `string` - Must be a valid URL
    - Description: Value that the host reference points to

#### Rename

- Usage: `restless host rename <old-name> <new-name>`
- Aliases: `r`,
- Description: Rename a host variable

- Arguments:
  - `old-name`
    - Type: `string`
    - Description: Reference name of the host
  - `new-name`
    - Type: `string`
    - Description: Value for the host to be renamed to

#### Remove

- Usage: `restless host remove <name>`
- Aliases: `rm`,
- Description: Remove a host variable

- Arguments:
  - `name`
    - Type: `string`
    - Description: Reference name of the host to be removed

#### List

- Usage: `restless host list`
- Aliases: `l`,
- Description: List all hosts in the current selected collection

### Cat

- Usage: `restless cat`
- Aliases: none,
- Description: Shows the content of the file where your user data is stored

- Options
  - `-c`, `--collapse`: Minifies JSON output

## <!-- Footer -->

###### Cooper Runyan
