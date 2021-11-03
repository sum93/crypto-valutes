/*
 Resource State:
  * Pending: The associated resource is being fetched and a loading state should be shown to the user
  * Success: The associated resource is returned successfully and it is available for further use
  * Error: The associated resource is failed to load and some error should be shown to the user
*/
export default {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}
