import DataControllerImp from '../DataControllerImp'

export type Publication = {
  id: number,
  user_id: string,
  title: string,
  description: string,
  price: number,
  currency: string,
  phone: string,
}

class PublicationsController extends DataControllerImp<Publication> {
  protected parseData(data: Publication, all?: boolean): Publication {
    const publication: Publication = !all ? {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      phone: data.phone
    } : {...data}
    return super.parseData(publication);
  }
}

export default PublicationsController;