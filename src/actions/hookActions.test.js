import moxios from "moxios";
import { getSecretWord } from "./hookActions";


describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  })
  test("calls setSecretWord with correct argument", async () => {
    const secretWord = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: secretWord
      });

    });

    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});