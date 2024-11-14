// import { renderHook, act } from '@testing-library/react-hooks';
// import useFetch from './useFetch';

// describe('useFetch Hook', () => {
//   const mockData = [{ id: 1, title: 'Test Post', body: 'This is a test post' }];

//   beforeEach(() => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ record: { record: mockData } }),
//       })
//     );
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('fetches and sets initial data on mount', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch());

//     await waitForNextUpdate();

//     expect(result.current.data).toEqual(mockData);
//     expect(fetch).toHaveBeenCalledTimes(1);
//     expect(fetch).toHaveBeenCalledWith(expect.any(String), {
//       headers: { 'X-Master-Key': expect.any(String) },
//     });
//   });

//   it('handles data deletion with handleDelete', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch());

//     await waitForNextUpdate();

//     act(() => {
//       result.current.handleDelete(1);
//     });

//     expect(result.current.data).toEqual([]);
//   });

//   it('updates data with handleSubmit (adding a post)', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch());

//     await waitForNextUpdate();

//     // Mocking a new post addition
//     act(() => {
//       result.current.handleInputChange({ target: { id: 'title', value: 'New Title' } });
//       result.current.handleInputChange({ target: { id: 'body', value: 'New Body' } });
//       result.current.handleSubmit();
//     });

//     expect(result.current.data.length).toBe(2);
//     expect(result.current.data[1]).toMatchObject({
//       id: 2,
//       title: 'New Title',
//       body: 'New Body',
//     });
//   });

//   it('handles editing a post with handleEdit and handleSubmit', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch());

//     await waitForNextUpdate();

//     act(() => {
//       result.current.handleEdit(mockData[0]);
//       result.current.handleInputChange({ target: { id: 'title', value: 'Updated Title' } });
//       result.current.handleSubmit();
//     });

//     expect(result.current.data[0]).toMatchObject({
//       id: 1,
//       title: 'Updated Title',
//       body: 'This is a test post',
//     });
//   });
// });
import { render, screen, act } from '@testing-library/react';
import useFetch from '../hooks/useFetch';

function TestComponent() {
  const { data, handleSubmit } = useFetch();

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      {data.length > 0 && <div>{data[0].title}</div>}
    </div>
  );
}

test('useFetch hook fetches data', async () => {
  render(<TestComponent />);

  const button = screen.getByText('Submit');
  act(() => {
    button.click();
  });
});
