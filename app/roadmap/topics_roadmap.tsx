//dashboard end
export {
  UpdateTopic,
  getTopicById,
  postTopic,
  postTopics,
} from "@/app/lib/repo/topics_repo";
export { default as TopicsView } from "../dashboard/topics/topics_view";
export { default as CreateTopic } from "../dashboard/topics/create_topic";
export type { TopicModel } from "@/app/models/topic_model";
//export { pushTopics } from "@/app/api/api_repos/topics_api_repo";
