import { Request, Response, NextFunction } from 'express';
import { ErrorCodes } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { SchoolService } from '../services/school.service';

const schoolService: SchoolService = new SchoolService();

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    schoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                result
            });
        })
        .catch((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.QueryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    })
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
        })
    
};

const getBoardType = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1; // declare default value, which obviously cannot work

    const sID: string = req.params.id;
    if (isNaN(Number(sID))) {
        // TODO: Error handling
    }

    if (sID !== null && sID !== undefined) {
        id = parseInt(sID);
    }
    else {
        // TODO: Error handling
    }
    
    if (id > 0) {
        schoolService.getBoardType(id)
            .then((result: whiteBoardType) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.QueryError:
                        return res.status(406).json({
                            errorMessage: error.message
                        })
                    default:
                        return res.status(400).json({
                            errorMessage: error.message
                        });
                }
            })
    }
    else {
        // TODO: Error handling
    }
    
};

export default { getBoardTypes, getBoardType };