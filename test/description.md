# Testing

## Unit Tests

For this project, I would do some unit tests for the following functionalities:

1. **Persist storage operations**  
   Use a mocked `localSession` to test functions responsible for storing and retrieving data.

2. **UI updates**  
   Test the UI behavior when a user interacts with the cards (e.g., deleting or expanding a card).

## Testing Tools

- **Vitest**: Suitable for testing since this is a Vite project.
- **@testing-library/react-hooks**: Useful for testing Zustand state management.

## Test Scenarios

### User Interactions

1. **When a user clicks the delete button**

   - The relevant item should be added to the storage.
   - The removed card should be added to the "removed" list.

2. **When a user expands a card**
   - The updated state should be reflected in the storage.
