const express = require('express')
const app = express()
const port = 3000

app.get('/:id', (req, res) => {
    if(req.params.id != "favicon.ico"){
        console.log(req.params)
    }

    if(req.params.id == "24313020710"){
        res.status(200).json({status: "SUCESS"})
    }else{
        res.status(201).json({status: "RECUSADO"})
    }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
