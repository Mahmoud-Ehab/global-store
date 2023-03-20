import { UserStrategy } from "./UserStrategy";
import { PublicationStrategy } from "./PublicationStrategy";
import { ReviewStrategy } from "./ReviewStrategy";
import { QueryManager } from "../../_modules/Database/QueryManager";

export class StrategiesFacade {
  private userStrategy: UserStrategy;
  private publicationStrategy: PublicationStrategy;
  private reviewStrategy: ReviewStrategy;

  constructor(queryManager: QueryManager) {
    this.userStrategy = new UserStrategy(queryManager);
    this.publicationStrategy = new PublicationStrategy(queryManager);
    this.reviewStrategy = new ReviewStrategy(queryManager);
  }

  get user() {
    return this.userStrategy;
  }

  get publication() {
    return this.publicationStrategy;
  }

  get review() {
    return this.reviewStrategy;
  }
}
