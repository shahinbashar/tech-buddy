import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/domain/entities/circular_entity.dart';
import 'package:tech_buddy/src/presentation/core/formatters/deadline_formatter.dart';

void main() {
  final now = DateTime(2026, 11, 4, 10);

  group('deadlineInfo', () {
    test('closed when the status is closed or the deadline passed', () {
      expect(
        deadlineInfo(
          status: CircularStatus.closed,
          deadline: now.add(const Duration(days: 3)),
          now: now,
        ).kind,
        DeadlineKind.closed,
      );
      expect(
        deadlineInfo(
          status: CircularStatus.open,
          deadline: now.subtract(const Duration(minutes: 1)),
          now: now,
        ).kind,
        DeadlineKind.closed,
      );
    });

    test('urgency buckets for open circulars', () {
      expect(
        deadlineInfo(
          status: CircularStatus.open,
          deadline: now.add(const Duration(hours: 5)),
          now: now,
        ).kind,
        DeadlineKind.closesToday,
      );
      final urgent = deadlineInfo(
        status: CircularStatus.open,
        deadline: now.add(const Duration(days: 2, hours: 1)),
        now: now,
      );
      expect(urgent.kind, DeadlineKind.urgent);
      expect(urgent.daysLeft, 2);
      expect(
        deadlineInfo(
          status: CircularStatus.open,
          deadline: now.add(const Duration(days: 20)),
          now: now,
        ).kind,
        DeadlineKind.open,
      );
    });

    test('upcoming before applications open', () {
      expect(
        deadlineInfo(
          status: CircularStatus.upcoming,
          deadline: now.add(const Duration(days: 9)),
          now: now,
        ).kind,
        DeadlineKind.upcoming,
      );
    });
  });

  test('formatClock and formatNumber', () {
    expect(formatClock(1199), '19:59');
    expect(formatClock(3725), '1:02:05');
    expect(formatClock(-3), '00:00');
    expect(formatNumber(4), '4');
    expect(formatNumber(37.5), '37.50');
  });
}
