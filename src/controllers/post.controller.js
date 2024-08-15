import pool from '../database/conection.js'

export default {
        // @ts-ignore
    createPost:async(req,res)=>{
        // @ts-ignore
        let {title,body,date} = req.body
        try {
            let post = await pool.query('INSERT INTO posts (title,body,created_at) VALUES($1,$2,$3)',[title,body,date])
            res.status(201).json({message:"201 : post criado com sucesso"})
        } catch (error) {
            console.error(error)
            res.status(500).json({message:"500" + error})
            
        }

        

    }
}