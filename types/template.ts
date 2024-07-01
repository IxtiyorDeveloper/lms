export interface ISmsTemplate {
  id: number;
  type: number;
  scenario: number;
  name: string;
  text: string;
  model_type: number;
  model_id?: any;
}
