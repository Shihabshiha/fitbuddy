import { Request, Response } from "express";
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

  return {
    getWeightGainPrograms
  }
}

export default programControllerFunction;