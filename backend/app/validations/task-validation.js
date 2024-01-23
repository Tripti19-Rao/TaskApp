const taskValidationSchema = {
    title:{
        notEmpty:{
            errorMessage:'Title name is required'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'Description is required'
        }
    },
    status:{
        notEmpty:{
            errorMessage:'Status is required'
        },
        isIn:{
            options:[['pending', 'in progress', 'completed']],
            errorMessage:'Status should be selected from the given list'
        }
        },
    priority:{
        notEmpty:{
            errorMessage:'Priority is required'
        },
        isIn:{
            options:[['low','medium','high']],
            errorMessage:'Priority should be selected within the given list'
    }
        }
}

module.exports = taskValidationSchema