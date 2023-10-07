import { connect } from 'mongoose'
import app from './src/app'
import logger from './src/utils/logger'
import { PORT, DB_URI } from './src/config'

const startApp = ()=>{
  app.listen(PORT, ()=>
    logger.info(`Server is listening at http://localhost:${PORT}`))
}

const main = async ()=>{
  try{
    await connect(DB_URI)
    logger.info('CONNECTED TO DATABASE')
    startApp()
  }catch(error){
    logger.error(error)
    process.exit(1)
  }
}

main()
