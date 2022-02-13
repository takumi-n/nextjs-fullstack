import { EndpointBuilder } from './endpoint';

test('追加されたクエリパラメータを正しい形式で出力できる', () => {
  const builder = new EndpointBuilder('/endpoint');

  expect(
    builder
      .param('k1', 'v1')
      .param('k2', 'v2')
      .param('invalidKey', 'invalid')
      .removeParam('invalidKey')
      .build()
  ).toBe('/endpoint?k1=v1&k2=v2');
});

test('コンストラクタに空文字を渡すことはできない', () => {
  expect(() => new EndpointBuilder('')).toThrowError();
});

test('同名のクエリパラメータキーが渡された場合は上書きされる', () => {
  const builder = new EndpointBuilder('/endpoint');

  expect(builder.param('key', 'oldValue').param('key', 'newValue').build()).toBe(
    '/endpoint?key=newValue'
  );
});

test('末尾の / は / 無しへ正規される', () => {
  const builder = new EndpointBuilder('/endpoint/');

  expect(builder.build()).toBe('/endpoint');
});

test('値が空文字のパラメータは無視される', () => {
  const builder = new EndpointBuilder('/endpoint/');

  expect(builder.param('key', '').build()).toBe('/endpoint');
});
