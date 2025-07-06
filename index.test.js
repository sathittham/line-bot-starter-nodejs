'use strict';

const { handleEvent } = require('./index');

// We create a "mock" client. This fake client allows us to check if its
// methods (like replyMessage) are called, without actually sending any
// real API requests to LINE.
const mockClient = {
  replyMessage: jest.fn(),
};

describe('handleEvent', () => {
  // This runs before each test, clearing the history of our mock function
  beforeEach(() => {
    mockClient.replyMessage.mockClear();
  });

  it('should reply with the same text for a text message event', async () => {
    // Arrange: Create a mock text message event from the LINE platform
    const event = {
      type: 'message',
      replyToken: 'replyToken123',
      message: {
        type: 'text',
        id: 'messageId123',
        text: 'Hello, bot!',
      },
    };

    // Act: Call the handler with the mock event and mock client
    await handleEvent(event, mockClient);

    // Assert: Check if replyMessage was called with the correct arguments
    expect(mockClient.replyMessage).toHaveBeenCalledTimes(1);
    expect(mockClient.replyMessage).toHaveBeenCalledWith(
      'replyToken123',
      { type: 'text', text: 'Hello, bot!' }
    );
  });

  it('should ignore non-text message events (like stickers)', async () => {
    // Arrange: Create a mock sticker event
    const event = {
      type: 'message',
      replyToken: 'replyToken456',
      message: { type: 'sticker', id: 'messageId456' },
    };

    // Act: Call the handler
    const result = await handleEvent(event, mockClient);

    // Assert: Check that replyMessage was NOT called and the function resolved to null
    expect(mockClient.replyMessage).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should ignore non-message events (like a follow event)', async () => {
    // Arrange: Create a mock follow event
    const event = {
      type: 'follow',
      replyToken: 'replyToken789',
    };

    // Act: Call the handler
    const result = await handleEvent(event, mockClient);

    // Assert: Check that replyMessage was NOT called
    expect(mockClient.replyMessage).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});

