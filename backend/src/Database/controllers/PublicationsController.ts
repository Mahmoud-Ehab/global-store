import DataController from '../abstracts/DataController'
import Queries from '../Queries';
import Publication from '../types/Publication'

class PublicationsController extends DataController<Publication> {
  queries = new Queries('publications');

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