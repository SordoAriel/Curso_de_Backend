import { program } from 'commander'

program
.option('--mode <mode>', 'Environment', 'dev')
.option('--port <port>', 'Localhosts port', 8080)
.option('--fs <fs>', 'File System persistence method', 'fs')
.parse()

export default program
