import { Response } from 'express'
import { EClassError } from '@nodejs-hexagonal-v2/utils'

/**
 * @description Process response as promise
 *
 * @param {Promise} prom Promise to resolve
 * @param {Response} res Response from request
 * @param {NextFunction} res Response from request
 * @returns {Promise<Response>}
 */
export const response = async <A>(prom: Promise<A>, res: Response<A>): Promise<Response<A>> => {
  try {
    const result = await prom
    return res.status(200).json(result)
  } catch (error) {
    switch (error.internalName) {
      case EClassError.INTERNAL:
        return res.status(500).json({ ...error })
      case EClassError.USER_ERROR:
        return res.status(400).json({ ...error })
      default:
        return res.status(500).json({ ...error })
    }
  }
}
