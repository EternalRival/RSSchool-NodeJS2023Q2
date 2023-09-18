# File Manager

1. Link to the task: [file-manager](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)
2. Deadline date: 2023-06-27 03:00 (UTC +03:00)
3. Self-check with a preliminary assessment (330/330). [Review from the assignment Curator](https://youtu.be/iNGEJVCmsyI)

## Notes

- Use 18 LTS version of Node.js
- The program is started by npm-script `start` in following way:

```sh
npm run start -- --username=your_username
```

- If the path contains whitespaces in the folder/file name, use backslash escaping (not quotes)

```sh
# example
cat filename\ with\ whitespaces.md
rn ./filename\ with\ whitespaces.md ./filename_with_underscore.md
```

- For compress/decompress use full file pathes

```sh
compress ./file-to-compress.md ./file-to-compress.md.br
compress ./file-to-decompress.md.br ./file-to-decompress.md
```

- Examples:

```sh
# exit
.exit

# upper
up

# change current working directory
cd ./some\ directory

# list current working directory
ls

# concatenate filepath
cat ./some\ directory/file-to-read.md

# create filepath
add ./some\ directory/file-to-create.md

# rename filepath1 to filepath2
rn ./some\ directory/file-to-rename.md ./some\ directory/filename-renamed.md

# copy filepath to another directory
cp ./some\ directory/file-to-copy.md ./second\ directory

# move filepath to another directory
mv ./some\ directory/file-to-move.md ./third\ directory

# delete filepath
rm ./some\ directory/file-to-delete.md

# os info (u can use single or multiple params)
os --EOL --cpus --homedir --username --architecture

# hash filepath
hash ./some\ directory/file-to-hash.md

# compress filepath1 to filepath2 with brotli
compress ./some\ directory/file-to-compress.md ./some\ directory/compressed-file.md.br

# decompress filepath1 to filepath2 with brotli
decompress ./some\ directory/file-to-decompress.md.br ./some\ directory/decompressed-file.md
```

## Scoring: File Manager

### Basic Scope

- General
  - [x] **+6** Application accepts username and prints proper message
  - [x] **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
- Operations fail
  - [x] **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
  - [x] **+10** Operation fail doesn't crash application
- Navigation & working directory operations implemented properly
  - [x] **+10** Go upper from current directory
  - [x] **+10** Go to dedicated folder from current directory
  - [x] **+20** List all files and folders in current directory
- Basic operations with files implemented properly
  - [x] **+10** Read file and print it's content in console
  - [x] **+10** Create empty file
  - [x] **+10** Rename file
  - [x] **+10** Copy file
  - [x] **+10** Move file
  - [x] **+10** Delete file
- Operating system info (prints following information in console) implemented properly
  - [x] **+6** Get EOL (default system End-Of-Line)
  - [x] **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
  - [x] **+6** Get home directory
  - [x] **+6** Get current _system user name_ (Do not confuse with the username that is set when the application starts)
  - [x] **+6** Get CPU architecture for which Node.js binary has compiled
- Hash calculation implemented properly
  - [x] **+20** Calculate hash for file
- Compress and decompress operations
  - [x] **+20** Compress file (using Brotli algorithm)
  - [x] **+20** Decompress file (using Brotli algorithm)

### Advanced Scope

- [x] **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
- [x] **+20** No synchronous Node.js API with asynchronous analogues is used (e.g. not used `readFileSync` instead of `readFile`)
- [x] **+20** Codebase is written in ESM modules instead of CommonJS
- [x] **+20** Codebase is separated (at least 7 modules)

### Forfeits

- [ ] **-95% of total task score** Any external tools/libraries are used
- [ ] **-30% of total task score** Commits after deadline (except commits that affect only `Readme.md`, `.gitignore`, etc.)
