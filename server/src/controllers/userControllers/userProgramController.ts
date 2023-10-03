import { Request, Response} from "express";
import programService from "../../services/userServices/programService";
import stripeInstance , { StripePaymentIntent} from "../../config/stripeConfig";
import config from "../../config/config";
import { CustomRequest } from "../../types/custom-request";


const programControllerFunction = () => {

  const programServices = programService()

  const getWeightGainPrograms = async (req:Request, res:Response) => {
    try{
      const programs = await programServices.getWeightGainPrograms()
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

  const handlePaymentSuccess = async( req:Request , res: Response ) => {
    try{
      const event = req.body;
      if (event.type === 'payment_intent.succeeded'){
        const paymentIntent : StripePaymentIntent = event.data.object;
        await programServices.handlePaymentSuccess(paymentIntent);   
        res.json({ received: true }); 
      }else{
        res.json({ received: true });
      }
    }catch(error:any){
      console.error('Unexpected error in webhook:', error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const createCheckoutSession = async (req:Request , res: Response ) => {
    try{
      const userId = (req as CustomRequest).person?.id as string
      const { programId } = req.body;
      const program = await  programServices.getProgramById(programId);
      const successUrl = `${config.FRONT_END_BASE_URL}/program/${programId}?result=success&courseId=${programId}`;
      const cancelUrl = `${config.FRONT_END_BASE_URL}/program/${programId}?result=cancel&courseId=${programId}`;


      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items: [
          {
            price: program?.stripePriceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        payment_intent_data : {
          metadata : {
            programId : programId,
            userId : userId,
          }
        },
      });
      res.status(200).json(session)
    }catch(error:any){
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  return {
    getWeightGainPrograms,
    getProgramDetails,
    handlePaymentSuccess,
    createCheckoutSession,
  }
}

export default programControllerFunction;