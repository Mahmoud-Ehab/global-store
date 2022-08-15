import DataController from '../DataController'
import Publication from '../types/Publication'

class PublicationsController extends DataController<Publication> {
  protected parseData(data: Publication): Publication {
    const publication: Publication = {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      cost: data.cost,
      currency: data.currency,
      phone: data.phone
    }    
    return publication;
  }
}

export default PublicationsController;