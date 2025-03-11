import { renderHook, act } from '@testing-library/react-native';
import { useProcessDocument } from '../useProcessDocument';
import apiClient from '@/src/apiClient';
import Toast from 'react-native-toast-message';

// Mock dependencies
jest.mock('@/src/apiClient', () => ({
  post: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('useProcessDocument', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a document successfully', async () => {
    // Mock API response
    const mockResponse = {
      status: 200,
      data: { message: 'Processing started' },
    };

    // Setup the mock to resolve with our mock response
    (apiClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Render the hook
    const { result } = renderHook(() => useProcessDocument());

    // Initially, processing should be false
    expect(result.current.isProcessing).toBe(false);

    // Call the processDocument function
    await act(async () => {
      await result.current.processDocument({ fileId: 1, blobUrl: 'https://example.com/document.pdf' });
    });

    // Verify API was called with the correct arguments
    expect(apiClient.post).toHaveBeenCalledWith(
      '/smartRead/file/process',
      { fileId: 1, blobUrl: 'https://example.com/document.pdf' }
    );

    // Check that isProcessing is now true
    expect(result.current.isProcessing).toBe(true);

    // No toast should be shown for successful API call (toast appears later after processing completes)
    expect(Toast.show).not.toHaveBeenCalled();
  });

  it('should handle missing required parameters', async () => {
    // Render the hook
    const { result } = renderHook(() => useProcessDocument());

    // Call the processDocument function with missing blobUrl
    await act(async () => {
      await result.current.processDocument({ fileId: 1, blobUrl: '' });
    });

    // Verify API was not called
    expect(apiClient.post).not.toHaveBeenCalled();

    // Check that isProcessing remains false
    expect(result.current.isProcessing).toBe(false);

    // Toast should be shown with error message
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Processing Failed',
      text2: 'File ID or Blob URL is missing.'
    });
  });

  it('should handle API errors', async () => {
    // Mock API error
    const mockError = new Error('Network error');

    // Setup the mock to reject with our mock error
    (apiClient.post as jest.Mock).mockRejectedValueOnce(mockError);

    // Render the hook
    const { result } = renderHook(() => useProcessDocument());

    // Call the processDocument function
    await act(async () => {
      await result.current.processDocument({ fileId: 1, blobUrl: 'https://example.com/document.pdf' });
    });

    // Verify API was called with the correct arguments
    expect(apiClient.post).toHaveBeenCalledWith(
      '/smartRead/file/process',
      { fileId: 1, blobUrl: 'https://example.com/document.pdf' }
    );

    // Check that isProcessing remains false
    expect(result.current.isProcessing).toBe(false);

    // Toast should be shown with error message
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Processing Failed',
      text2: 'An error occurred while processing the document.'
    });
  });
});