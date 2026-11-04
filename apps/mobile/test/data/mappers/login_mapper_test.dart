import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/data/mappers/login_mapper.dart';
import 'package:tech_buddy/src/data/models/login_model.dart';

void main() {
  const mapper = LoginMapper();

  group('LoginMapper', () {
    test(
      'decodes the mobile auth response and maps the user without tokens',
      () {
        final model = LoginResponseModel.fromJson({
          'user': {
            'id': 'u1',
            'email': 'rahim@example.com',
            'fullName': '  Rahim Uddin ',
            'phone': null,
            'role': 'USER',
            'hasPremium': true,
            'createdAt': '2026-11-04T10:00:00.000Z',
          },
          'accessToken': 'a.tok',
          'refreshToken': 'r.tok',
        });

        final entity = mapper.toEntity(model.user);

        expect(model.accessToken, 'a.tok');
        expect(model.refreshToken, 'r.tok');
        expect(entity.id, 'u1');
        expect(entity.fullName, 'Rahim Uddin');
        expect(entity.firstName, 'Rahim');
        expect(entity.isAdmin, isFalse);
        expect(entity.hasPremium, isTrue);
      },
    );
  });
}
