import pool from '../database/conection.js'

export default {
        // @ts-ignore
    createPost:async(req,res)=>{
        // @ts-ignore
        let {user_id,title,body,date} = req.body
        if(!user_id||!title||!body){
            res.status(400).json({message:"400 : preencha todos os dados"})
        }
        try {
            let post = await pool.query('INSERT INTO posts (title,body,user_id,created_at) VALUES($1,$2,$3,$4)',[title,body,user_id,date])
            res.status(201).json({message:"201 : post criado com sucesso"})
        } catch (error) {
            console.error(error)
            res.status(500).json({message:"500" + error})
            
        }

        

    }
}