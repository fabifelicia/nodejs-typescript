//Importação das libs
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'query-string'
import * as url from 'url'
import { writeFile, readFile, unlink } from 'fs'


//Definição de porta
const port = 5000


const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const urlParse = url.parse(request.url ? request.url : ' ', true)
    
    const responseUser = (resposta : any) => {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/plain')
        response.end(resposta)
    }

    // Receber informações do usuario
    const params = parse(urlParse.search ? urlParse.search : ' ')

    // Criar um usuario
    if (urlParse.pathname === '/criar-usuario') {

        writeFile(`users/${params.id}.txt`, JSON.stringify(params), (err: any) => {
            if (err) throw err

            responseUser('Usuario criado com sucesso!')

        })
    }  

    //Atualizar usuario
    else if (urlParse.pathname === '/atualizar-usuario') {

        writeFile(`users/${params.id}.txt`, JSON.stringify(params), (err: any) => {
            if (err) throw err

            responseUser('Usuario atualizado com sucesso!')
        })
    } 

    //Search user
    else if(urlParse.pathname == '/selecionar-usuario') {
      readFile(`users/${params.id}.txt`, (err: any, data: Object) => {
        if(err) throw err
  
        responseUser(data)
        
      })
    }
      //Delete user
      else if(urlParse.pathname == '/remover-usuario') {
       unlink(`users/${params.id}.txt`, (err: any) => {        
        let resposta =  err ? 'Usuario nao encontrado' : 'Usuario deletado com sucesso'
  
          responseUser(resposta)
        })
      }


})

// Execução
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})