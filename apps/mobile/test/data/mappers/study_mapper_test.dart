import 'package:flutter_test/flutter_test.dart';
import 'package:tech_buddy/src/data/mappers/study_mapper.dart';
import 'package:tech_buddy/src/data/models/study_model.dart';

void main() {
  const mapper = StudyMapper();

  group('StudyMapper', () {
    test('subject progress is the completed share, and 0 with no topics', () {
      final subject = mapper.toSubject(
        SubjectModel.fromJson({
          'id': 's1',
          'slug': 'ict',
          'name': 'ICT',
          'topicCount': 4,
          'completedCount': 1,
        }),
      );
      final empty = mapper.toSubject(
        SubjectModel.fromJson({
          'id': 's2',
          'slug': 'bangla',
          'name': 'Bangla',
          'topicCount': 0,
          'completedCount': 0,
        }),
      );

      expect(subject.progress, 0.25);
      expect(empty.progress, 0);
    });

    test('maps the topic tree with premium and lock flags', () {
      final detail = mapper.toSubjectDetail(
        SubjectDetailModel.fromJson({
          'id': 's1',
          'slug': 'computer-science',
          'name': 'Computer Science',
          'topicCount': 2,
          'completedCount': 1,
          'topics': [
            {
              'id': 't1',
              'slug': 'networking',
              'title': 'Networking',
              'accessLevel': 'FREE',
              'isLocked': false,
              'isCompleted': true,
              'noteCount': 2,
              'children': [
                {
                  'id': 't2',
                  'slug': 'osi',
                  'title': 'OSI model',
                  'accessLevel': 'PREMIUM',
                  'isLocked': true,
                  'isCompleted': false,
                },
              ],
            },
          ],
        }),
      );

      final parent = detail.topics.single;
      final child = parent.children.single;
      expect(parent.isPremium, isFalse);
      expect(parent.isCompleted, isTrue);
      expect(child.isPremium, isTrue);
      expect(child.isLocked, isTrue);
      expect(child.noteCount, 0);
    });

    test('topic detail drops blank content and maps neighbours', () {
      final topic = mapper.toTopicDetail(
        TopicDetailModel.fromJson({
          'id': 't1',
          'slug': 'number-systems',
          'title': 'Number Systems',
          'content': '   ',
          'subject': {'slug': 'computer-science', 'name': 'Computer Science'},
          'isLocked': false,
          'isCompleted': false,
          'notes': [
            {
              'id': 'n1',
              'title': 'Conversions',
              'content': '## Bases',
              'isLocked': false,
            },
            {'id': 'n2', 'title': 'Advanced', 'isLocked': true},
          ],
          'children': [],
          'previous': null,
          'next': {'id': 't2', 'slug': 'logic-gates', 'title': 'Logic Gates'},
        }),
      );

      expect(topic.content, isNull);
      expect(topic.subjectSlug, 'computer-science');
      expect(topic.notes.first.content, '## Bases');
      expect(topic.notes.last.isLocked, isTrue);
      expect(topic.notes.last.content, isNull);
      expect(topic.previous, isNull);
      expect(topic.next?.slug, 'logic-gates');
    });
  });
}
