export class EndpointBuilder {
  private readonly path: string;
  private params: { [key: string]: string } = {};

  constructor(path: string) {
    if (path === '') {
      throw new Error('`path` must not be empty');
    }

    let _path = path;
    if (_path.slice(-1) === '/') {
      _path = _path.slice(0, -1);
    }

    this.path = _path;
  }

  param(key: string, value: string): EndpointBuilder {
    this.params[key] = value;
    return this;
  }

  removeParam(key: string): EndpointBuilder {
    delete this.params[key];
    return this;
  }

  build(): string {
    const queryParams = Object.entries(this.params)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${this.path}${queryParams ? `?${queryParams}` : ''}`;
  }
}
