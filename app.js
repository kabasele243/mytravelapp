const express = require('express');
const fs = require('fs')
const app = express()

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.use(express.json())

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
          status: "success",
          results: tours.length,
          data: {
              tours
          }
      })
})

app.get('/api/v1/tours/:id', (req, res) => {
    
    const id = req.params.id * 5 ;
    const tour = tours.find( el => el.id == req.params.id);

    if(!tours){
        return res.status(404).json({
            status:"fail",
            message: "Invalid Id"
        })
    }

    res.status(200).json({
          status: "success",
          data: {
              tour
          }
      })
})

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id : newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status:'success',
            data: {
                tour: newTour
            }
        })
    })
})

app.patch('/api/v1/tours', (req, res) => {
    if(req.params.id * id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Update tour here...'
        }
    })
})

app.delete('/api/v1/tours/:id', (req, res) => {
    
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
})


const port = 4500;
app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})