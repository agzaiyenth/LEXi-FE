import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useGetAllDocuments } from '../useGetAllDocuments';
import apiClient from '@/src/apiClient';

// Mock the apiClient
jest.mock('@/src/apiClient', () => ({
  get: jest.fn(),
}));

describe('useGetAllDocuments', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all documents successfully', async () => {
    // Mock API response
    const mockResponse = {
      data: [
        {
          id: 1,
          fileName: 'document1.pdf',
          blobUrl: 'https://example.com/document1.pdf',
          uploadedAt: new Date().toISOString(),
          processed: true
        },
        {
          id: 2,
          fileName: 'document2.pdf',
          blobUrl: 'https://example.com/document2.pdf',
          uploadedAt: new Date().toISOString(),
          processed: false
        }
      ],
    };

    // Setup the mock to resolve with our mock response
    (apiClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Render the hook
    const { result } = renderHook(() => useGetAllDocuments());

    // Initially, we expect loading to be true and documents to be an empty array
    expect(result.current.loading).toBe(true);
    expect(result.current.documents).toEqual([]);

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify API was called with the correct arguments
    expect(apiClient.get).toHaveBeenCalledWith('/smartRead/file/fetch-all');

    // Check that the hook returns the expected data
    expect(result.current.documents).toEqual(mockResponse.data);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    // Mock API error
    const mockError = {
      response: {
        data: {
          message: 'Error fetching documents',
        },
      },
    };

    // Setup the mock to reject with our mock error
    (apiClient.get as jest.Mock).mockRejectedValueOnce(mockError);

    // Render the hook
    const { result } = renderHook(() => useGetAllDocuments());

    // Wait for the API call to reject
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify API was called with the correct arguments
    expect(apiClient.get).toHaveBeenCalledWith('/smartRead/file/fetch-all');

    // Updated: Match the actual string returned by the hook (without the period)
    expect(result.current.error).toBe('Error fetching documents');
    expect(result.current.documents).toEqual([]);
  });

  it('should provide a refetch function that updates documents', async () => {
    // Initial mock response
    const initialResponse = {
      data: [
        {
          id: 1,
          fileName: 'document1.pdf',
          blobUrl: 'https://example.com/document1.pdf',
          uploadedAt: new Date().toISOString(),
          processed: true
        }
      ],
    };

    // Updated mock response for refetch
    const updatedResponse = {
      data: [
        {
          id: 1,
          fileName: 'document1.pdf',
          blobUrl: 'https://example.com/document1.pdf',
          uploadedAt: new Date().toISOString(),
          processed: true
        },
        {
          id: 2,
          fileName: 'document2.pdf',
          blobUrl: 'https://example.com/document2.pdf',
          uploadedAt: new Date().toISOString(),
          processed: false
        }
      ],
    };

    // Setup the mock to resolve with our mock responses in sequence
    (apiClient.get as jest.Mock).mockResolvedValueOnce(initialResponse)
                               .mockResolvedValueOnce(updatedResponse);

    // Render the hook
    const { result } = renderHook(() => useGetAllDocuments());

    // Wait for the initial API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify initial data is loaded
    expect(result.current.documents).toEqual(initialResponse.data);

    // Call refetch inside act to handle state updates
    await act(async () => {
      result.current.refetch();
    });

    // Wait for the second API call to resolve
    await waitFor(() => {
      expect(result.current.documents).toEqual(updatedResponse.data);
    });

    // Verify API was called again
    expect(apiClient.get).toHaveBeenCalledTimes(2);
  });
});