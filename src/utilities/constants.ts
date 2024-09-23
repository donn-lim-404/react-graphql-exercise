// @TODO: can later on merge serviceType as one whole property
export const serviceTypes = ['delivery', 'pick-up', 'payment'];
export const serviceTypesValue = [0, 1, 2];

export const messages = {
  error: {
    validation: {
      name: {
        missing: 'Missing required field "name".'
      },
      email: {
        missing: 'Missing required field "email".',
        invalid: 'Invalid email address provided.',
        unique: 'The "email" is already in use.'
      },
      postcode: {
        missing: 'Missing required field "postcode".'
      },
      service: {
        missing: 'Missing required field "service".',
        invalid: ''
      }
    }
  }
};