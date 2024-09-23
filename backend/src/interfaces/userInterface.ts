export default interface UserInterface {
  name: string,
  email: string,
  mobile?: number | null,
  postcode?: number | null,
  service: number,
  serviceType?: string | null,
};