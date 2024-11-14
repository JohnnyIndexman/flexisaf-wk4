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
