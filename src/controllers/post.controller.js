import pool from '../database/conection.js'

export default {
        // @ts-ignore
    createPost:async(req,res)=>{
        // @ts-ignore
        let {user_id,title,body} = req.body
        if(!user_id||!title||!body){
             return res.status(400).json({message:"400 : preencha todos os dados"})
        }
        if(user_id<=0){
             return res.status(400).json({message:"400 : id invalido"})
        }
       
        try {
         await pool.query('INSERT INTO posts (title,body,user_id,created_at) VALUES($1,$2,$3,NOW())',[title,body,user_id])
            res.status(201).json({message:"201 : post criado com sucesso"})
        } catch (error) {
            console.error(error)
            res.status(500).json({message:"500:post nao criado"})
            
        }

        

    }
}