import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import React from 'react'
import { ProgramApiResponse } from "../../types/courseType";
import { USER_AVATHAR } from "../../constants/common";

interface programCardProps {
  programInfo : ProgramApiResponse
}
 
const  ProgramCard : React.FC<programCardProps> = ({ programInfo }) => {
  const programThumbnail = programInfo.thumbnailUrl
  const trainerProfile = programInfo.trainerProfileUrl || USER_AVATHAR;

  return (
    <Card className="max-w-[20rem] max-h-[25rem]  overflow-hidden hover:shadow-lg">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >     
        <img
          src={programThumbnail}
          alt="ui/ux review check"
          className="inset-0 w-full h-[200px] object-cover "
        />
      </CardHeader>
      <CardBody className="shadow-md bg-gray-50" style={{padding:"0.5rem"}}> 
        <Typography variant="h5" color="blue-gray" className="text-center font-mono">
          {programInfo.courseName}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal text-left text-base  font-sans" >
          {programInfo.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between bg-gray-100" style={{padding:"0.5rem"}}>
        <div className="flex items-center -space-x-3" >
          <Tooltip content={programInfo.trainerName}>
            <Avatar
              size="sm"
              variant="circular"
              alt="trainer"
              src={trainerProfile}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">By {programInfo.trainerName}</Typography>
      </CardFooter>
  </Card>
  
  );
}

export default ProgramCard