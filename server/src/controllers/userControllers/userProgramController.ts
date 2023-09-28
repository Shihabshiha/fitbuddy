import { Request, Response} from "express";
import programService from "../../services/userServices/programService";


const programControllerFunction = () => {

  const programServices = programService()

  const getWeightGainPrograms = async (req:Request, res:Response) => {
    try{
      const programs = await programServices.getWeightGainPrograms()
      console.log('proooo',programs)
      res.status(200).json({programs})
    }catch(error:any){
      res.status(500).json({error:'Internal server error'})
    }
  }

  const getProgramDetails = async ( req:Request , res:Response) => {
    try{
      const programId : string = req.params.programId;
      const program = await programServices.getProgramDetails(programId)
      res.status(200).json({program})
    }catch(error:any){
      
      res.status(500).json({error:"Internal server error"})
    }
  }

  return {
    getWeightGainPrograms,
    getProgramDetails
  }
}

export default programControllerFunction;