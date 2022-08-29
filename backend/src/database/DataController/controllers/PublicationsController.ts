import DataController from '../DataController'

type Publication = {
  id: number,
  user_id: number,
  title: string,
  description: string,
  price: number,
  currency: string,
  phone: string,
}

class PublicationsController extends DataController<Publication> {
  protected parseData(data: Publication): Publication {
    const publication: Publication = {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      phone: data.phone
    }    
    return publication;
  }
}

export default PublicationsController;