import { Logger } from '../console';

export class Package {
  static load(pkgName: string): any {
    try {
      return require(pkgName);
    } catch (e) {
      Logger.error(
        ` ${pkgName} is missing. Please make sure that you have installed the package first `,
      );
      process.exitCode = 1;
      process.exit();
    }
  }
}
