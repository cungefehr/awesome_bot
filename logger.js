const {createLogger, transports, format} = require ('winston')


const awesomeLogger = createLogger({
  transports:[
    new transports.File({
      filename:'awesome.log',
      level:'info',
      format: format.combine(format.timestamp(),format.json())
    }),
    new transports.File({
      filename:'awesome-error.log',
      level:'error',
      format: format.combine(format.timestamp(),format.json())
    })
  ]
})

module.exports = {awesomeLogger}
