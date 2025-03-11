import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchDocument } from '../useFetchDocument';
import apiClient from '@/src/apiClient';

// Mock the apiClient
jest.mock('@/src/apiClient', () => ({
  get: jest.fn(),
}));

describe('useFetchDocument', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch document details successfully', async () => {
    // Mock API response
    const mockResponse = {
      data: {
        fileName: 'test-document.pdf',
        blobUrl: 'https://example.com/test-document.pdf',
        summary: 'This is a test summary of the document.',
        ttsAudioUrl: 'https://example.com/audio.mp3',
      },
    };

    // Setup the mock to resolve with our mock response
    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Render the hook with a test fileId
    const { result } = renderHook(() => useFetchDocument(1));

    // Initially, we expect loading to be true and document to be null
    expect(result.current.loading).toBe(true);
    expect(result.current.document).toBeNull();

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify API was called with the correct arguments
    expect(apiClient.get).toHaveBeenCalledWith('/smartRead/file/fetch/1');

    // Check that the hook returns the expected data
    expect(result.current.document).toEqual(mockResponse.data);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    // Mock API error
    const mockError = {
      response: {
        data: {
          message: 'Failed to fetch document',
        },
      },
    };

    // Setup the mock to reject with our mock error
    (apiClient.get as jest.Mock).mockRejectedValueOnce(mockError);

    // Render the hook with a test fileId
    const { result } = renderHook(() => useFetchDocument(1));

    // Wait for the API call to reject
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify API was called with the correct arguments
    expect(apiClient.get).toHaveBeenCalledWith('/smartRead/file/fetch/1');

    // Check that the hook returns the expected error
    expect(result.current.error).toBe('Failed to fetch document');
    expect(result.current.document).toBeNull();
  });
});